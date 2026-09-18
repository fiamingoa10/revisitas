ddeclare module "virtual:revisitas-og-identity" {
  export const revisitasOgIdentity: Record<string, unknown>;
    site: {
      title?: string;
      description?: string;
      type?: string;
      card?: string;
      image?: string;
      banner?: string;
      color?: string;
    };
  };
}
