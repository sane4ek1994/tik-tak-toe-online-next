import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export function AuthFormLayout({
  title,
  actions,
  description,
  fields,
  link,
  error,
  action,
}: {
  title: string;
  description: string;
  fields: React.ReactNode;
  actions: React.ReactNode;
  link: React.ReactNode;
  error: React.ReactNode;
  action: (formData: FormData) => void;
}) {
  return (
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-6 ">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form
        action={action}
        className="space-y-4  shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {fields}
        {error}
        {actions}
      </form>
      <CardFooter className="flex justify-center">{link}</CardFooter>
    </Card>
  );
}
