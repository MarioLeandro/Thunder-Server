export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        name: string;
        email: string;
        manager: boolean;
        id: string;
      },
    }
  }
}