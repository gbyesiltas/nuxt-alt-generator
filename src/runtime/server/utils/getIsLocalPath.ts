export default function getIsLocalPath(src: string) {
  // Check if the src is a local path
  return src.startsWith('/') && !src.startsWith('//')
}
