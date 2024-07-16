import { useState } from "react"

export const DownloadPage = () => {
  const [id, setId] = useState("")

  const handleDownload = async () => {
    if (id) {
      try {
        const savePath = "asd" //(id)
        alert(`File saved to ${savePath}`)
      } catch (error) {
        console.error("Error downloading file:", error)
        alert("Failed to download the file.")
      }
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter ID"
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button onClick={handleDownload} style={{ padding: "5px 10px" }}>
        Download
      </button>
    </div>
  )
}
