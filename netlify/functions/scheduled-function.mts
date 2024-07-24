import type { Config } from "@netlify/functions"

export default async (req: Request) => {
    const { next_run } = await req.json()

    console.log("Received event! Next invocation at:", next_run)

    try {
        const response = await fetch("https://pxybcxdlbxhtmcidluxs.supabase.co/functions/v1/youtube-videos", {
            method: "GET"
        })
        const data = await response.json()
        console.log("Response from the endpoint:", data)
    } catch (error) {
        console.error("Error hitting the endpoint:", error)
    }
}

export const config: Config = {
    schedule: "0 0 */3 * *"
}