import { redirect } from "next/navigation";

// Required for static export build compatibility
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
    { id: "13" },
    { id: "14" },
    { id: "15" }
  ];
}

export default function ProjectDetailsRedirect({ params }: { params: { id: string } }) {
  redirect(`/projects/detail/?id=${params.id}`);
}
