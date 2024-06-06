import type { number } from 'echarts/core';
import { lcgrand } from './randnumber';

var amount:number, bigs:number,initial_inv_level:number, inv_level:number, next_event_type:number, num_events:number,
    num_months:number, num_values_demand:number, smalls:number;
var area_holding:number, area_shortage:number, holding_cost:number, incremental_cost:number, maxlag:number,
    mean_interdemand:number, minlag:number,  setup_cost:number,
    shortage_cost:number, sim_time:number, time_last_event:number,total_ordering_cost:number;
var prob_distrib_demand: number[] = [26], time_next_event: number[] = [5];

export function inv (num_policies:any){
    var i;
    for (i = 1; i <= num_policies; ++i) {
        /* Run the simulation until it terminates after an end-simulation event
           (type 3) occurs. */
        do {
            /* Determine the next event. */
            timing();
            /* Update time-average statistical accumulators. */
            update_time_avg_stats();
            /* Invoke the appropriate event function. */
            switch (next_event_type) {
                case 1:
                    order_arrival();
                    break;
                case 2:
                    demand();
                    break;
                case 4:
                    evaluate();
                    break;
                case 3:
                    // report();
                    break;
            }
        /* If the event just executed was not the end-simulation event (type 3),
           continue simulating.  Otherwise, end the simulation for the current
           (s,S) pair and go on to the next pair (if any). */

        } while (next_event_type != 3);
    }
}

function initialize(initial_inv_level:number,mean_interdemand:number,num_months:number){
    sim_time = 0.0;
    inv_level       = initial_inv_level;
    time_last_event = 0.0;
    total_ordering_cost = 0.0;
    area_holding        = 0.0;
    area_shortage       = 0.0;
    time_next_event[1] = Number.MAX_VALUE;
    time_next_event[2] = sim_time + expon(mean_interdemand);
    time_next_event[3] = num_months;
    time_next_event[4] = 0.0;
}

// function expon (mean_interdemand:number):number{
//     return 1;
// }

function timing()  /* Timing function. */
{
    var   i;
    var min_time_next_event = 1.0e+29;

    next_event_type = 0;

    /* Determine the event type of the next event to occur. */

    for (i = 1; i <= num_events; ++i)
        if (time_next_event[i] < min_time_next_event) {
            min_time_next_event = time_next_event[i];
            next_event_type     = i;
        }

    /* Check to see whether the event list is empty. */

    if (next_event_type == 0) {

        /* The event list is empty, so stop the simulation */
    }

    /* The event list is not empty, so advance the simulation clock. */

    sim_time = min_time_next_event;
}

function order_arrival()  /* Order arrival event function. */
{
    /* Increment the inventory level by the amount ordered. */

    inv_level += amount;

    /* Since no order is now outstanding, eliminate the order-arrival event from
       consideration. */

    time_next_event[1] = 1.0e+30;
}


function demand()  /* Demand event function. */
{
    /* Decrement the inventory level by a generated demand size. */

    //这里可能会出问题
    inv_level -= randomInteger(prob_distrib_demand);

    /* Schedule the time of the next demand. */

    time_next_event[2] = sim_time + expon(mean_interdemand);
}


function evaluate()  /* Inventory-evaluation event function. */
{
    /* Check whether the inventory level is less than smalls. */

    if (inv_level < smalls) {

        /* The inventory level is less than smalls, so place an order for the
           appropriate amount. */

        amount               = bigs - inv_level;
        total_ordering_cost += setup_cost + incremental_cost * amount;

        /* Schedule the arrival of the order. */

        time_next_event[1] = sim_time + uniform(minlag, maxlag);
    }

    /* Regardless of the place-order decision, schedule the next inventory
       evaluation. */

    time_next_event[4] = sim_time + 1.0;
}

function update_time_avg_stats()  /* Update area accumulators for time-average
                                     statistics. */
{
    let time_since_last_event;

    /* Compute time since last event, and update last-event-time marker. */

    time_since_last_event = sim_time - time_last_event;
    time_last_event       = sim_time;

    /* Determine the status of the inventory level during the previous interval.
       If the inventory level during the previous interval was negative, update
       area_shortage.  If it was positive, update area_holding.  If it was zero,
       no update is needed. */

    if (inv_level < 0)
        area_shortage -= inv_level * time_since_last_event;
    else if (inv_level > 0)
        area_holding  += inv_level * time_since_last_event;
}

function expon(mean: number): number   /* Exponential variate generation function. */
{
    /* Return an exponential random variate with mean "mean". */

    return -mean *  Math.log(lcgrand(1));
}


function  randomInteger(probDistrib: number[]): number{ /* Random integer generation
                                             function. */
    let i = 1;
    let u = lcgrand(1);
    /* Generate a U(0,1) random variate. */

    u = lcgrand(1);

    /* Return a random integer in accordance with the (cumulative) distribution
       function prob_distrib. */

    while (u >= probDistrib[i]) {
        i++;
    }
    return i;
}


function uniform(a:number, b:number)  /* Uniform variate generation function. */
{
    /* Return a U(a,b) random variate. */

    return a + lcgrand(1) * (b - a);
}

