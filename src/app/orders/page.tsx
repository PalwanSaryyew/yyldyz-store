import { prisma } from "../../../prisma/prismaSett"

const data = await prisma.order.findMany({
  where: {
    userId: '1'
  }
})
const Page = () => {
  return (
    <div className='flex bg-slate-300 flex-col items-center mt-8 w-[90%] m-auto rounded-3xl mb-48'>
      {data.map(order => (
        <div key={order.id}>{order.userId}</div>
      ))}
    </div>
  )
}

export default Page