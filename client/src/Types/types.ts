type UsersAddress = {
  city: string;
  geo: object;
  street: string;
  suite: string;
  zipcode: string;
};

type UsersCompany = {
  bs: string;
  catchPhrase: string;
  name: string;
};

export type UsersData = {
  id: number;
  name: string;
  username: string;
  address: UsersAddress | string;
  company: UsersCompany | string;
  email: string;
  phone: string;
  website: string;
};

export type UsersPosts = {
    body: string,
    title: string,
    id: number,
    userId: number,
    title_crop?: string
}

export type ExtendedUserData = UsersData & { posts: UsersPosts[] };