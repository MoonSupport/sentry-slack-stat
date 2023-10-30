class Project {
  id: number;

  slug: string;

  constructor(props: any) {
    this.id = Number(props.id);
    this.slug = props.slug;
  }
}

export default Project;
