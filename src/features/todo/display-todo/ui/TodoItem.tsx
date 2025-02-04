import { useRequestDeleteTodo } from "@/entities/todo";
import { TodoType } from "@/shared/apis/request/todo";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { LucideIcon } from "@/shared/ui/icons";

type Props = {
  todo: TodoType;
};

const PriorityEmoji = (priority: "상" | "중" | "하") => {
  switch (priority) {
    case "상":
      return <LucideIcon name="BatteryFull" size={50} color="#2aea10" />;
    case "중":
      return <LucideIcon name="BatteryMedium" size={50} color="#ea5c10" />;
    case "하":
      return <LucideIcon name="BatteryLow" size={50} color="#ea1010" />;
  }
};

export default function TodoItem({ todo }: Props) {
  const { deleteTodo } = useRequestDeleteTodo();

  const handleClick = () => {
    deleteTodo(todo.id);
  };
  return (
    <Card>
      <CardHeader className="flex items-center justify-between font-semibold">
        <h2 className="text-2xl">{todo.title}</h2>
        <Button onClick={handleClick} asChild>
          <LucideIcon name="Trash2" size={60} />
        </Button>
      </CardHeader>
      <CardContent>{todo.description}</CardContent>
      <CardFooter className="flex justify-between">
        {PriorityEmoji(todo.priority)}
      </CardFooter>
    </Card>
  );
}
