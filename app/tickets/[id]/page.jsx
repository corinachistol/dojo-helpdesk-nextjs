import { notFound } from "next/navigation"

export const dynamicParams = true

//static rendering
//get a  list of all id's of all tickets list at build time ,so next js can make a page at corespounding route
//[ {id:'1'}, {id:'2', {....}}]
//Such function, in combination with revalidate object, can increase the performance of app, as NextJs renders this part on server and keeps it cached

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets")

  const tickets = await res.json()

  return tickets.map(ticket => ({
    id:ticket.id
  }))
}

async function getTicket(id) {
      //imitate delay
      await new Promise(resolve => setTimeout(resolve,3000))
      
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
      //this object is added when we want to save the date in cache, and after that time make the refresh, for example 60- it means seconds
      next: {
          revalidate: 60 
      }
  })
  
  // console.log(res)
  
  if (!res.ok){
    notFound()
  }

  return res.json()
}

export default async function TicketDetails({params}) {
    
  const ticket = await getTicket(params.id)
  // console.log(ticket)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}
