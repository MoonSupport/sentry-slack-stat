class Subscribe {
  categories: {
    errors: {
      usage: number;
      reserved: number;
    };
  };

  billingPeriodStart: Date;

  billingPeriodEnd: Date;

  constructor(props: any) {
    this.categories = props.categories;
    this.categories.errors = props.categories.errors;
    this.categories.errors.usage = props.categories.errors.usage;
    this.categories.errors.reserved = props.categories.errors.reserved;

    this.billingPeriodStart = new Date(props.billingPeriodStart);
    this.billingPeriodEnd = new Date(props.billingPeriodEnd);
  }
}

export default Subscribe;
