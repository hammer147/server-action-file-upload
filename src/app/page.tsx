import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default function Home() {
  async function upload(formData: FormData) {
    'use server'
    const file = formData.get('file') as File

    if (!file) {
      throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // '/' creates a folder in the root directory of the drive your project is on
    // './' creates a folder in the root directory of your project
    const path = join('./', 'tmp', file.name)
    await mkdir(join('./', 'tmp'), { recursive: true })

    await writeFile(path, buffer)
    console.log(`Open ${path} to see the uploaded file.`)
    return { success: true }
  }

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <h1 className='text-6xl font-bold text-center mb-4'>
        React Server Component
      </h1>
      <h1 className='text-6xl font-bold text-center mb-6'>
        File Upload via Server Action
      </h1>
      <form action={upload}>
        <input type='file' name='file' className='text-gray-800 py-2 px-4 bg-gray-200 m-2 rounded-lg'/>
        <input type='submit' value='Upload' className='text-gray-800 py-2 px-4 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg cursor-pointer'/>
      </form>
    </main>
  )
}
