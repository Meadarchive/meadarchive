export default function getBatchQRCodeLink(batchLink: string, file_name?: string) {
      return `${import.meta.env.VITE_SERVER_URL}/get-qr?url=${batchLink}&file_name=${file_name}`
}
