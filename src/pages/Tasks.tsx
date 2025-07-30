import { useState } from "react";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Plus, CheckSquare, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Schedule second viewing for Ocean View Condo",
    description: "Client Sarah Johnson expressed strong interest and wants to bring her spouse for a second viewing. Follow up within 2 days.",
    priority: "high" as const,
    status: "pending" as const,
    dueDate: "Tomorrow",
    assignedTo: "You",
    relatedProperty: "123 Ocean View Drive, Unit 12A",
    source: "ai-extracted" as const
  },
  {
    id: "2",
    title: "Research soundproofing options for Downtown Plaza",
    description: "Client Mike Brown concerned about street noise. Gather information about existing soundproofing and potential improvements.",
    priority: "medium" as const,
    status: "in-progress" as const,
    dueDate: "This Friday",
    assignedTo: "You",
    relatedProperty: "456 Downtown Plaza, Apartment 8B",
    source: "ai-extracted" as const
  },
  {
    id: "3",
    title: "Send school district information to Wilson family",
    description: "Provide detailed school ratings and enrollment information for the Suburban Lane property area.",
    priority: "high" as const,
    status: "pending" as const,
    dueDate: "Today",
    assignedTo: "You",
    relatedProperty: "789 Suburban Lane",
    source: "ai-extracted" as const
  },
  {
    id: "4",
    title: "Prepare market analysis for Oak Street property",
    description: "Compile comparable sales data and market trends for upcoming client presentation.",
    priority: "low" as const,
    status: "completed" as const,
    dueDate: "Yesterday",
    assignedTo: "You",
    source: "manual" as const
  },
  {
    id: "5",
    title: "Contact contractor for kitchen renovation estimate",
    description: "Wilson family needs renovation cost estimate for kitchen at Suburban Lane property.",
    priority: "medium" as const,
    status: "pending" as const,
    dueDate: "Next Monday",
    assignedTo: "You",
    relatedProperty: "789 Suburban Lane",
    source: "ai-extracted" as const
  }
];

export const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [tasks, setTasks] = useState(mockTasks);
  const { toast } = useToast();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === "pending").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length,
    highPriority: tasks.filter(t => t.priority === "high" && t.status !== "completed").length
  };

  const handleToggleComplete = (id: string) => {
    const currentTask = tasks.find(t => t.id === id);
    const newStatus = currentTask?.status === "completed" ? "pending" : "completed";
    
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, status: newStatus as "pending" | "in-progress" | "completed" }
        : task
    ));
    
    toast({
      title: newStatus === "completed" ? "Task Completed" : "Task Reopened",
      description: `Task "${currentTask?.title}" has been ${newStatus === "completed" ? "marked as complete" : "reopened"}`,
    });
  };

  const handleEditTask = (id: string) => {
    toast({
      title: "Edit Task",
      description: `Opening edit dialog for task ${id}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Management</h1>
          <p className="text-muted-foreground">AI-extracted tasks and follow-ups from your recordings</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckSquare className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.highPriority}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tasks found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};