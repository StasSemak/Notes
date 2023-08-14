const redisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN

type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export const fetchRedis = async (
    command: Command,
    ...args: (string | number)[]
) => {
    const url = `${redisRestUrl}/${command}/${args.join('/')}`

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        cache: 'no-store'
    })

    if(!response.ok) {
        throw new Error(`Error executing Redis command: ${response.statusText}`)
    }

    const data = await response.json();
    return data.result
} 