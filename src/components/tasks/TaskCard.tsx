import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, AlertCircle, User } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  assignedTo: string;
  relatedProperty?: string;
  source: "ai-extracted" | "manual";
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TaskCard = ({ task, onToggleComplete, onEdit }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const isCompleted = task.status === "completed";

  return (
    <Card className={`hover:shadow-lg transition-all duration-200 ${isCompleted ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className={`text-base ${isCompleted ? 'line-through' : ''}`}>
                {task.title}
              </CardTitle>
              <div className="flex gap-2">
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className={`text-sm text-muted-foreground ${isCompleted ? 'line-through' : ''}`}>
          {task.description}
        </p>

        {task.relatedProperty && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4" />
            <span>Property: {task.relatedProperty}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{task.assignedTo}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{task.dueDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {task.source === "ai-extracted" && (
              <Badge variant="outline" className="text-xs">
                AI Generated
              </Badge>
            )}
          </div>
          <Button
            onClick={() => onEdit(task.id)}
            variant="outline"
            size="sm"
            disabled={isCompleted}
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};