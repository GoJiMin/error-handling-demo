import { Photo } from "@/shared/apis/request/photo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import Image from "next/image";

type Props = {
  photo: Photo;
  priority: boolean;
};

export default function PhotoCard({ photo: { title }, priority }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed dolorum,
          praesentium ea accusamus eligendi asperiores aspernatur iste. Dolor
          tempora iure necessitatibus quaerat ut natus, perspiciatis officia
          architecto dicta illum ea!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          className="rounded-lg object-cover border-gray-200"
          src={"https://picsum.photos/seed/picsum/600/300"}
          alt={`${title} Image`}
          width={600}
          height={300}
          priority={priority}
        />
      </CardContent>
    </Card>
  );
}
