const API_URL = 'http://localhost:7070/posts';
export interface ListData {
    id: number;
    content: string;
    created: string;
  }

  export const fetchPosts = async (): Promise<ListData[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  export const createPost = async (content: string) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 0, content }),
    });
    return response
  };
  
  
  export const fetchPostById = async (id: number) => {
    const url = `${API_URL}/${id}`;
   // console.log('Fetching from URL:', url); // Выводим URL
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Error fetching post: ${response.statusText}`);
    }
    //console.log(response.json());
    return response.json();
};
  
  export const updatePost = async (id:number, content:string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, content }),
    });
    return response.json();
  };
  
  export const deletePost = async (id:number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    console.log(`${API_URL}/${id}`)
  };