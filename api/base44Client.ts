// Temporary stub client to allow the UI to run without the real Base44 SDK.
// Replace this implementation with your real API client as needed.

type User = {
  id: string;
  email: string;
  full_name?: string;
  department?: string;
  role?: string;
};

type Task = {
  id: string;
};

type TeamUpdate = {
  id: string;
};

type Resource = {
  id: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const dummyUser: User = {
  id: "1",
  email: "demo@example.com",
  full_name: "Demo User",
  department: "development",
  role: "admin",
};

export const base44 = {
  auth: {
    async me(): Promise<User> {
      await delay(200);
      return dummyUser;
    },
    logout(redirectUrl?: string) {
      // eslint-disable-next-line no-console
      console.log("Stub logout called", redirectUrl);
    },
    redirectToLogin(returnTo?: string) {
      // eslint-disable-next-line no-console
      console.log("Stub redirectToLogin called", returnTo);
    },
  },
  entities: {
    Task: {
      async list(): Promise<Task[]> {
        await delay(200);
        return [];
      },
      async create(_data: any): Promise<Task> {
        await delay(200);
        return { id: "new-task" };
      },
      async update(id: string, _data: any): Promise<Task> {
        await delay(200);
        return { id };
      },
      async delete(_id: string): Promise<void> {
        await delay(100);
      },
    },
    TeamUpdate: {
      async list(): Promise<TeamUpdate[]> {
        await delay(200);
        return [];
      },
      async create(_data: any): Promise<TeamUpdate> {
        await delay(200);
        return { id: "new-update" };
      },
      async delete(_id: string): Promise<void> {
        await delay(100);
      },
    },
    User: {
      async list(): Promise<User[]> {
        await delay(200);
        return [dummyUser];
      },
    },
    Resource: {
      async list(): Promise<Resource[]> {
        await delay(200);
        return [];
      },
      async create(_data: any): Promise<Resource> {
        await delay(200);
        return { id: "new-resource" };
      },
      async delete(_id: string): Promise<void> {
        await delay(100);
      },
    },
  },
  integrations: {
    Core: {
      async UploadFile(_args: { file: File }): Promise<{ file_url: string }> {
        await delay(300);
        return { file_url: "#" };
      },
    },
  },
  users: {
    async inviteUser(_email: string, _role: "admin" | "user") {
      await delay(200);
    },
  },
};

