// export default function handler(req, res) {
//   const files = [
//     { id: 1, name: "file1.txt" },
//     { id: 2, name: "file2.txt" },
//   ];

//   res.status(200).json(files);
// }

export default async function handler(req, res) {
  const baseUrl = "http://10.1.1.190:8084";
  const url = `${baseUrl}/api/files`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
