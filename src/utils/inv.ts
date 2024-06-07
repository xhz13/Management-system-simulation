import { lcgrand } from './randnumber'

let amount: number,
  bigs: number,
  initial_inv_level: number,
  inv_level: number,
  inv_level_temp: number,
  next_event_type: number,
  num_events: number,
  num_months: number,
  num_values_demand: number,
  smalls: number

let area_holding: number,
  area_shortage: number,
  holding_cost: number,
  incremental_cost: number,
  maxlag: number,
  mean_interdemand: number,
  minlag: number,
  setup_cost: number,
  shortage_cost: number,
  sim_time: number,
  time_last_event: number,
  total_ordering_cost: number

let prob_distrib_demand: number[] = [26],
  time_next_event: number[] = [5]

let smallsArray: number[] = [],
  bigsArray: number[] = [],
  avg_ordering_costArray: number[] = [],
  avg_holding_costArray: number[] = [],
  avg_shortage_costArray: number[] = []
let randomNumber: number
let quality: number[]=[], max_shelf_life: number, min_shelf_life: number /* 记录每个商品保质期的数组 */
let express_order_num: number,express_order_numArray: number[] = [],isSpoiled: boolean=false,total_cost,total_costArray: number[] = []
let sum_spoiled_num:number = 0,sum_spoiled_numArray: number[] = [],Total_items:number = 0,ratioArray: number[] = []
export function inv(num_policies: any) {
  smallsArray = []
  bigsArray = []
  avg_ordering_costArray = []
  avg_holding_costArray = []
  avg_shortage_costArray = []
  express_order_numArray = []
  total_cost=0.0
  total_costArray = []
  sum_spoiled_numArray = []
  ratioArray = []
  inv_level_temp = inv_level
  let i
  num_events = 4
  for (i = 1; i <= num_policies; ++i) {
    express_order_num = 0
    /* Run the simulation until it terminates after an end-simulation event
           (type 3) occurs. */
    sim_time = 0.0
    time_last_event = 0.0
    total_ordering_cost = 0.0
    area_holding = 0.0
    area_shortage = 0.0
    time_next_event[1] = Number.MAX_VALUE
    time_next_event[2] = sim_time + expon(mean_interdemand)
    time_next_event[3] = num_months
    time_next_event[4] = 0.0
    sum_spoiled_num = 0
    inv_level = inv_level_temp
    Total_items=0
    for (let j = 1; j <= inv_level; j++) {
      quality[j] = sim_time + uniform(min_shelf_life, max_shelf_life)
    }
    switch (i) {
      case 1:
        smalls = 20
        bigs = 40
        break
      case 2:
        smalls = 20
        bigs = 60
        break
      case 3:
        smalls = 20
        bigs = 80
        break
      case 4:
        smalls = 20
        bigs = 100
        break
      case 5:
        smalls = 40
        bigs = 60
        break
      case 6:
        smalls = 40
        bigs = 80
        break
      case 7:
        smalls = 40
        bigs = 100
        break
      case 8:
        smalls = 60
        bigs = 80
        break
      case 9:
        smalls = 60
        bigs = 100
        break
    }
    do {
      /* Determine the next event. */
      timing()
      /* Update time-average statistical accumulators. */
      update_time_avg_stats()
      /* Invoke the appropriate event function. */
      switch (next_event_type) {
        case 1:
          order_arrival()
          express_order_num++;
          break
        case 2:
          demand()
          break
        case 4:
          evaluate()
          break
        case 3:
          report()
          break
      }
      /* If the event just executed was not the end-simulation event (type 3),
           continue simulating.  Otherwise, end the simulation for the current
           (s,S) pair and go on to the next pair (if any). */
    } while (next_event_type != 3)
  }
  return [
    smallsArray,
    bigsArray,
    avg_ordering_costArray,
    avg_holding_costArray,
    avg_shortage_costArray,
    total_costArray,
    express_order_numArray,
  ]
}

export function initialize(
  initial_inv_level1: number,
  mean_interdemand1: number,
  num_months1: number,
  num_values_demand1: number,
  setup_cost1: number,
  incremental_cost1: number,
  holding_cost1: number,
  shortage_cost1: number,
  minlag1: number,
  maxlag1: number,
  randomNumber1: number,
  min_shelf_life1?: number,
  max_shelf_life1?: number
) {
  randomNumber = randomNumber1
  sim_time = 0.0
  time_last_event = 0.0
  total_ordering_cost = 0.0
  area_holding = 0.0
  area_shortage = 0.0
  time_next_event[1] = Number.MAX_VALUE
  time_next_event[2] = sim_time + expon(mean_interdemand1)
  time_next_event[3] = num_months1
  time_next_event[4] = 0.0
  prob_distrib_demand[1] =0.167
  prob_distrib_demand[2] =0.500
  prob_distrib_demand[3] =0.833
  prob_distrib_demand[4] =1.000
  num_months = num_months1
  inv_level = initial_inv_level1
  Total_items = initial_inv_level1
  num_values_demand = num_values_demand1
  mean_interdemand = mean_interdemand1
  setup_cost = setup_cost1
  incremental_cost = incremental_cost1
  holding_cost = holding_cost1
  shortage_cost = shortage_cost1
  minlag = minlag1
  maxlag = maxlag1
  isSpoiled=false
  /* Initialize each inventory's shelf life */
  if (min_shelf_life1 !== undefined && max_shelf_life1 !== undefined) {
    isSpoiled = true
    min_shelf_life = min_shelf_life1
    max_shelf_life = max_shelf_life1
    for (let i = 1; i <= initial_inv_level1; i++) {
      quality[i] = sim_time + uniform(min_shelf_life, max_shelf_life)
    }
  }
}
export function reportmystaff(){
  return [sum_spoiled_numArray,ratioArray]
}

function report /* Report generator function. */() {
  /* Compute and write estimates of desired measures of performance. */
  let avg_holding_cost=0, avg_ordering_cost=0, avg_shortage_cost=0
  avg_ordering_cost = total_ordering_cost / num_months
  avg_holding_cost = (holding_cost * area_holding) / num_months
  avg_shortage_cost = (shortage_cost * area_shortage) / num_months
  total_cost = avg_ordering_cost + avg_holding_cost + avg_shortage_cost
  smallsArray.push(smalls)
  bigsArray.push(bigs)
  avg_ordering_costArray.push(avg_ordering_cost)
  avg_holding_costArray.push(avg_holding_cost)
  avg_shortage_costArray.push(avg_shortage_cost)
  express_order_numArray.push(express_order_num)
  total_costArray.push(total_cost)
  sum_spoiled_numArray.push(sum_spoiled_num)
  let ratio = sum_spoiled_num / Total_items
  ratioArray.push(ratio)
}

function timing /* Timing function. */() {
  let i
  let min_time_next_event = 1.0e29
  next_event_type = 0
  /* Determine the event type of the next event to occur. */
  for (i = 1; i <= num_events; ++i)
    if (time_next_event[i] < min_time_next_event) {
      min_time_next_event = time_next_event[i]
      next_event_type = i
    }
  /* Check to see whether the event list is empty. */
  if (next_event_type == 0) {
    /* The event list is empty, so stop the simulation */
  }
  /* The event list is not empty, so advance the simulation clock. */
  sim_time = min_time_next_event
}

function order_arrival /* Order arrival event function. */() {
  /*订单到达时，初始化决定这批订单的保质期*/
  for (let i = 1; i <= amount; i++) {
    if (inv_level + i > 0)
      //避免负库存情况，负的库存直接补给前面的需求，刚到的必然不会过期
      quality[inv_level + i] = sim_time + uniform(min_shelf_life, max_shelf_life)
  }
  /* Increment the inventory level by the amount ordered. */
  inv_level += amount
  Total_items += amount
  /* Since no order is now outstanding, eliminate the order-arrival event from
       consideration. */
  time_next_event[1] = 1.0e30
}

function demand /* Demand event function. */() {
   /*需求到达时，依次判断库存里货物是否到期*/
  let demand_num = randomInteger(prob_distrib_demand)
  let spoiled_num = 0;


  if (isSpoiled) {
    if (inv_level >= demand_num) {
      for (let i = 1; i <= demand_num + spoiled_num; i++) {
        if (demand_num + spoiled_num <= inv_level) {
          if (quality[i] < sim_time) {
            spoiled_num++;
          }
        } else {
          for (; i <= inv_level; i++) {
            if (quality[i] < sim_time) {
              spoiled_num++;
            }
          }
          break;
        }
      }
    } else {
      for (let i = 1; i <= inv_level; i++) {
        if (quality[i] < sim_time) {
          spoiled_num++;
        }
      }
    }
    sum_spoiled_num += spoiled_num;
    
  }
  inv_level = inv_level - spoiled_num - demand_num;

  if (inv_level > 0) {
    for (let i = 1; i <= inv_level; i++) {
      quality[i] = quality[i + spoiled_num + demand_num];
    }
  }

  /* Decrement the inventory level by a generated demand size. */
  // inv_level -= randomInteger(prob_distrib_demand)
  /* Schedule the time of the next demand. */
  time_next_event[2] = sim_time + expon(mean_interdemand)
}

function evaluate /* Inventory-evaluation event function. */() {
  /* Check whether the inventory level is less than smalls. */
  if (inv_level < smalls) {
    /* The inventory level is less than smalls, so place an order for the
           appropriate amount. */
    amount = bigs - inv_level
    total_ordering_cost += setup_cost + incremental_cost * amount
    /* Schedule the arrival of the order. */
    time_next_event[1] = sim_time + uniform(minlag, maxlag)
  }
  /* Regardless of the place-order decision, schedule the next inventory
       evaluation. */
  time_next_event[4] = sim_time + 1.0
}

function update_time_avg_stats /* Update area accumulators for time-average statistics. */() {
  let time_since_last_event
  /* Compute time since last event, and update last-event-time marker. */
  time_since_last_event = sim_time - time_last_event
  time_last_event = sim_time
  /* Determine the status of the inventory level during the previous interval.
       If the inventory level during the previous interval was negative, update
       area_shortage.  If it was positive, update area_holding.  If it was zero,
       no update is needed. */
  if (inv_level < 0) area_shortage -= inv_level * time_since_last_event
  else if (inv_level > 0) area_holding += inv_level * time_since_last_event
}

function expon(mean: number): number /* Exponential variate generation function. */ {
  /* Return an exponential random variate with mean "mean". */
  return -mean * Math.log(lcgrand(randomNumber))
}

function randomInteger(probDistrib: number[]): number {
  /* Random integer generation function. */
  let i = 1
  let u = lcgrand(randomNumber)
  /* Generate a U(0,1) random variate. */
  u = lcgrand(randomNumber)
  /* Return a random integer in accordance with the (cumulative) distribution
       function prob_distrib. */
  while (u >= probDistrib[i]) {
    i++
  }
  return i
}

function uniform(a: number, b: number /* Uniform variate generation function. */) {
  /* Return a U(a,b) random variate. */
  return a + lcgrand(randomNumber) * (b - a)
}
