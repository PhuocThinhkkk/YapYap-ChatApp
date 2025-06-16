import { NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import MESSAGE from "@/schema/message";
import { MessageDB } from "@/type";

export async function GET(request: Request,  {params}:  { params : Promise<{userId : string}>}) {
    try{
        const { userId } = await params;
        const userIdSession = await getUserIdInSession()
  
    
        if (!userId || userId != userIdSession) {
            return NextResponse.json(
            { error: 'unauthorize.' },
            { status: 400 }
            );
        }

        return getLastMonthMessages(userId)
    }catch(e){
        console.log("error :", e)
        return NextResponse.json({message: "Server error!"}, {status: 500})
    }
}




interface MessageCountByDay {
  date: string; // Format: "May 27"
  count: number;
}

async function getLastMonthMessages(userId: string) : Promise<NextResponse<MessageCountByDay[]>>{
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  
  const messages : MessageDB[] = await MESSAGE.find({
    user : userId,
    createdAt: { $gte: monthAgo }
  }).sort({ createdAt: 1 });

  
  const dailyCounts: Record<string, number> = {};

  messages.forEach(message => {
    const date = message.createdAt;
    if(!date){
      console.error("some message dont have createAt")
      return NextResponse.json({messsage : "Server Error"}, { status: 200 });
    }
    const dateKey = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }); // Format: "May 27"

    dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
  });

  
  const result: MessageCountByDay[] = Object.entries(dailyCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

 
  const completeResult = fillMissingDays(result, monthAgo);
  console.log("api hello: ", completeResult)
  return NextResponse.json(completeResult, { status: 200 });
}

function fillMissingDays(data: MessageCountByDay[], startDate: Date): MessageCountByDay[] {
  const result: MessageCountByDay[] = [];
  const currentDate = new Date(startDate);
  const today = new Date();
  const dateFormatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

  while (currentDate <= today) {
    const dateStr = currentDate.toLocaleDateString('en-US', dateFormatOptions);
    const existingData = data.find(item => item.date === dateStr);
    
    result.push({
      date: dateStr,
      count: existingData ? existingData.count : 0
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}
