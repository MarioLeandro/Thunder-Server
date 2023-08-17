export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        name: string;
        email: string;
        id: string;
        level: number;
        currentExperience: number;
        picture: string;
      },
    }
  }
}