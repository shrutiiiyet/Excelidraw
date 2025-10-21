import { Shape } from "@repo/common";

export class Eraser {
  private context: CanvasRenderingContext2D;
  private shapes: Shape[];
  private eraserSize: number = 20;

  constructor(context: CanvasRenderingContext2D, shapes: Shape[]) {
    this.context = context;
    this.shapes = shapes;
  }

  public setEraserSize(size: number): void {
    this.eraserSize = size;
  }

  public erase(x: number, y: number): Shape[] {
    const shapeDistances: Array<{ shape: Shape; distance: number }> = [];

    // Find all shapes whose stroke/outline intersects with the eraser
    for (const shape of this.shapes) {
      const strokeIntersection = this.isPointOnShapeStroke(shape, x, y);
      if (strokeIntersection.onStroke) {
        shapeDistances.push({
          shape,
          distance: strokeIntersection.distance,
        });
      }
    }

    if (shapeDistances.length === 0) {
      return this.shapes; // No shapes to erase
    }

    // Sort by distance - shapes that are closer to the point come first
    shapeDistances.sort((a, b) => a.distance - b.distance);

    // Get the closest shape
    const closestShape = shapeDistances[0].shape;

    // Create a new array without the erased shape
    const remainingShapes = this.shapes.filter(
      (shape) => shape.id !== closestShape.id,
    );

    return remainingShapes;
  }

  private isPointOnShapeStroke(
    shape: Shape,
    x: number,
    y: number,
  ): { onStroke: boolean; distance: number } {
    // Apply rotation if the shape has rotation
    let pointX = x;
    let pointY = y;

    if (shape.rotation) {
      const centerX = (shape.x1 + shape.x2) / 2;
      const centerY = (shape.y1 + shape.y2) / 2;

      // Transform point to account for shape rotation
      const rotatedPoint = this.rotatePoint(
        pointX,
        pointY,
        centerX,
        centerY,
        -shape.rotation,
      );
      pointX = rotatedPoint.x;
      pointY = rotatedPoint.y;
    }

    this.context.save();

    // Configure the context for stroke detection
    this.context.lineWidth = Math.max(this.eraserSize, 10); // Minimum stroke width for easier erasing
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.beginPath();

    // Draw the appropriate path based on shape type
    switch (shape.type) {
      case "Rectangle":
        this.drawRectanglePath(shape);
        break;
      case "Diamond":
        this.drawDiamondPath(shape);
        break;
      case "Ellipse":
        this.drawEllipsePath(shape);
        break;
      case "Line":
        this.drawLinePath(shape);
        break;
      case "Arrow":
        this.drawArrowPath(shape);
        break;
      case "Freehand":
        if (shape.paths) {
          // For freehand shapes, check if any point is within eraser radius
          const isOnStroke = shape.paths.some((point) => {
            const distance = Math.sqrt(
              Math.pow(point[0] - pointX, 2) + Math.pow(point[1] - pointY, 2),
            );
            return distance <= this.eraserSize / 2;
          });

          if (isOnStroke) {
            // Find the closest point for distance calculation
            const closestPoint = shape.paths.reduce(
              (closest, point) => {
                const distance = Math.sqrt(
                  Math.pow(point[0] - pointX, 2) +
                    Math.pow(point[1] - pointY, 2),
                );
                return distance < closest.distance
                  ? { point, distance }
                  : closest;
              },
              { point: shape.paths[0], distance: Infinity },
            );

            this.context.restore();
            return { onStroke: true, distance: closestPoint.distance };
          }
        }
        this.context.restore();
        return { onStroke: false, distance: Infinity };
      default:
        this.context.restore();
        return { onStroke: false, distance: Infinity };
    }

    // Create the stroke path for intersection testing
    this.context.stroke();

    // Check if the point is on the stroke (not inside the fill)
    const isOnStroke = this.context.isPointInStroke(pointX, pointY);

    // Calculate distance to stroke center
    let distance = Infinity;
    if (isOnStroke) {
      // For lines and arrows, use perpendicular distance to the line
      if (shape.type === "Line" || shape.type === "Arrow") {
        distance = this.getDistanceToLine(
          pointX,
          pointY,
          shape.x1,
          shape.y1,
          shape.x2,
          shape.y2,
        );
      } else {
        // For closed shapes, can use center distance as tiebreaker
        const centerX = (shape.x1 + shape.x2) / 2;
        const centerY = (shape.y1 + shape.y2) / 2;
        distance = Math.sqrt(
          Math.pow(pointX - centerX, 2) + Math.pow(pointY - centerY, 2),
        );
      }
    }

    this.context.restore();
    return { onStroke: isOnStroke, distance };
  }

  /**
   * Calculate distance from a point to a line
   */
  private getDistanceToLine(
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): number {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) {
      param = dot / lenSq;
    }

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;

    return Math.sqrt(dx * dx + dy * dy);
  }

  //Rotates a point around a center by a given angle in degrees
  private rotatePoint(
    x: number,
    y: number,
    cx: number,
    cy: number,
    angleDegrees: number,
  ): { x: number; y: number } {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const cos = Math.cos(angleRadians);
    const sin = Math.sin(angleRadians);

    // Translate point to origin
    const nx = x - cx;
    const ny = y - cy;

    // Rotate point
    const rotatedX = nx * cos - ny * sin;
    const rotatedY = nx * sin + ny * cos;

    // Translate point back
    return {
      x: rotatedX + cx,
      y: rotatedY + cy,
    };
  }

  private drawRectanglePath(shape: Shape): void {
    const minX = Math.min(shape.x1, shape.x2);
    const minY = Math.min(shape.y1, shape.y2);
    const width = Math.abs(shape.x2 - shape.x1);
    const height = Math.abs(shape.y2 - shape.y1);

    this.context.rect(minX, minY, width, height);
  }

  private drawDiamondPath(shape: Shape): void {
    const centerX = (shape.x1 + shape.x2) / 2;
    const centerY = (shape.y1 + shape.y2) / 2;
    const width = Math.abs(shape.x2 - shape.x1);
    const height = Math.abs(shape.y2 - shape.y1);

    this.context.moveTo(centerX, centerY - height / 2);
    this.context.lineTo(centerX + width / 2, centerY);
    this.context.lineTo(centerX, centerY + height / 2);
    this.context.lineTo(centerX - width / 2, centerY);
    this.context.closePath();
  }

  private drawEllipsePath(shape: Shape): void {
    const centerX = (shape.x1 + shape.x2) / 2;
    const centerY = (shape.y1 + shape.y2) / 2;
    const radiusX = Math.abs(shape.x2 - shape.x1) / 2;
    const radiusY = Math.abs(shape.y2 - shape.y1) / 2;

    this.context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  }

  private drawLinePath(shape: Shape): void {
    this.context.moveTo(shape.x1, shape.y1);
    this.context.lineTo(shape.x2, shape.y2);
  }

  private drawArrowPath(shape: Shape): void {
    // Draw the main line
    this.context.moveTo(shape.x1, shape.y1);
    this.context.lineTo(shape.x2, shape.y2);

    // Calculate and draw arrowhead
    const angle = Math.atan2(shape.y2 - shape.y1, shape.x2 - shape.x1);
    const arrowSize = 10;

    const arrowLeftX = shape.x2 - arrowSize * Math.cos(angle - Math.PI / 6);
    const arrowLeftY = shape.y2 - arrowSize * Math.sin(angle - Math.PI / 6);

    const arrowRightX = shape.x2 - arrowSize * Math.cos(angle + Math.PI / 6);
    const arrowRightY = shape.y2 - arrowSize * Math.sin(angle + Math.PI / 6);

    // Draw the left part of the arrowhead
    this.context.moveTo(shape.x2, shape.y2);
    this.context.lineTo(arrowLeftX, arrowLeftY);

    // Draw the right part of the arrowhead
    this.context.moveTo(shape.x2, shape.y2);
    this.context.lineTo(arrowRightX, arrowRightY);
  }
}
