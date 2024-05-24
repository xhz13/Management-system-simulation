import { FunnelChart } from 'echarts/charts';
import { lcgrand } from './randnumber';

enum EventType {
    BUSY = 1,
    IDLE = 0
}
enum Q_LIMIT {
    LENGTH = 100
}

var time_next_event: number[] = [3];
var time_arrival: number[] = [Q_LIMIT.LENGTH + 1];

var num_events:number = 2;
var sim_time:number = 0.0;
var server_status:EventType=EventType.IDLE;
var num_in_q:number = 0;
var time_last_event:number = 0.0;
var num_custs_delayed:number = 0;
var total_of_delays:number =  0.0;
var area_num_in_q:number = 0.0;
var area_server_status:number = 0.0;

var mean_service:number;
var next_event_type:number;
var mean_interarrival:number;

export function mm1(num_delays_required:number,mean_interarrival_in:number,mean_service_in:number): number[]{

    sim_time = 0.0;
    server_status = EventType.IDLE;
    num_in_q = 0;
    time_last_event = 0.0;
    num_custs_delayed = 0;
    total_of_delays = 0.0;
    area_num_in_q = 0.0;
    area_server_status = 0.0;

    mean_interarrival = mean_interarrival_in;
    mean_service = mean_service_in;

    time_next_event[1] = sim_time + expon(mean_interarrival);
    time_next_event[2] = 1.0e+30;

    while(num_custs_delayed<num_delays_required){
        timing();
        update_time_avg_stats();
        switch(next_event_type){
            case 1:
                arrive();
                break;
            case 2:
                depart();
                break;
        }
    }
    return [total_of_delays / num_custs_delayed, area_num_in_q / sim_time, area_server_status / sim_time, sim_time];
}


function timing(){ /* Timing function. */
    var min_time_next_event:number=Number.MAX_VALUE;
    var i:number = 0;
    next_event_type = 0;
    /* Determine the event type of the next event to occur. */

    for(i=1;i<=num_events;i++){
        if(time_next_event[i]<min_time_next_event){
            min_time_next_event = time_next_event[i];
            next_event_type = i;
        }
    }

    /* Check to see whether the event list is empty. */

    if(next_event_type==0){

        /* The event list is empty, so stop the simulation. */

        console.log("Event list empty at time "+sim_time);
        process.exit();
    }

    /* The event list is not empty, so advance the simulation clock. */

    sim_time = min_time_next_event;
}


function arrive(){ /* Arrival event function. */
    var delay:number = 0;

     /* Schedule next arrival. */

    let test = expon(mean_interarrival);
    time_next_event[1] = sim_time + expon(mean_interarrival);


     /* Check to see whether server is busy. */

    if(server_status==EventType.BUSY){

        /* Server is busy, so increment number of customers in queue. */

        ++num_in_q;

        /* Check to see whether an overflow condition exists. */
        if(num_in_q>Q_LIMIT.LENGTH){
            /* The queue has overflowed, so stop the simulation. */
            console.log("Overflow of the array time_arrival at");
            console.log("time "+sim_time);
            process.exit();
        }

        /* There is still room in the queue, so store the time of arrival of the
           arriving customer at the (new) end of time_arrival. */
        time_arrival[num_in_q] = sim_time;
    }

    else{

        /* Server is idle, so arriving customer has a delay of zero.  (The
           following two statements are for program clarity and do not affect
           the results of the simulation.) */
        delay = 0.0;
        total_of_delays += delay;

        /* Increment the number of customers delayed, and make server busy. */
        ++num_custs_delayed;
        server_status = EventType.BUSY;

         /* Schedule a departure (service completion). */
        time_next_event[2] = sim_time + expon(mean_service);
    }

}


function depart(){ /* Departure event function. */
    var delay:number=0;
    var i:number=0;

    /* Check to see whether the queue is empty. */

    if(num_in_q==0){
        /* The queue is empty so make the server idle and eliminate the
           departure (service completion) event from consideration. */

        server_status = EventType.IDLE;
        time_next_event[2] = Number.MAX_VALUE;
    }

    else{

        /* The queue is nonempty, so decrement the number of customers in
           queue. */
        --num_in_q;

        /* Compute the delay of the customer who is beginning service and update
           the total delay accumulator. */

        delay = sim_time - time_arrival[1];
        total_of_delays += delay;

        /* Increment the number of customers delayed, and schedule departure. */
        ++num_custs_delayed;
        let test2 = expon(mean_service);
        time_next_event[2] = sim_time + expon(mean_service);
        
         /* Move each customer in queue (if any) up one place. */
        for(i=1;i<=num_in_q;i++){
            time_arrival[i] = time_arrival[i+1];
        }
    }

}


function update_time_avg_stats(){ /* Update area accumulators for time-average statistics. */
    var time_since_last_event:number = 0;

    /* Compute time since last event, and update last-event-time marker. */
    time_since_last_event = sim_time - time_last_event;
    time_last_event = sim_time;

    /* Update area under number-in-queue function. */
    area_num_in_q += num_in_q * time_since_last_event;

    /* Update area under server-busy indicator function. */
    area_server_status += server_status * time_since_last_event;

}


function expon(mean: number): number   /* Exponential variate generation function. */
{
    /* Return an exponential random variate with mean "mean". */
    return -mean * Math.log(lcgrand(1));
}











