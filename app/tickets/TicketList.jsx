import Link from "next/link";

async function getTickets() {
    //imitate delay
    await new Promise(resolve => setTimeout(resolve,3000))

    const res = await fetch("http://localhost:4000/tickets", {
        //this object is added when we want to save the date in cache, and after that time make the refresh, for example 30- it means seconds
        next: {
            revalidate: 0 // use 0 to opt out of using cache
        }
    })
    
    return res.json()
}


export default async function TicketList() {    
    const tickets = await getTickets()


  return (
    <>
        {tickets.map(ticket => (
            <div key={ticket.id} className="card my-5">
                <Link href={`/tickets/${ticket.id}`} >
                    <h3>{ticket.title}</h3>
                    <p>{ticket.body.slice(0,200)}...</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                    </div>
                </Link>
            </div>
        ))}
        {tickets.length === 0 && (
            <p className="text-center ">There are no open tickets</p>
        )}
    </>
  )
}


// tickets/id