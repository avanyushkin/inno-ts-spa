type loginRes = {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  image: string,
  token: string
};
export async function login (username: string, password: string): Promise<loginRes> {
  const res = await fetch ("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify ({ username, password }),
  });
  if (!res.ok) {
    throw new Error ("login failed");
  }
  return res.json();
}

