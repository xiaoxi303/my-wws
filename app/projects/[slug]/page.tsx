import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectCasePage from "@/components/ProjectCasePage";
import { getProjectBySlug, getRelatedProjects, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project"
    };
  }

  return {
    title: project.title,
    description: project.intro
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project.slug);

  return <ProjectCasePage project={project} related={related} />;
}
