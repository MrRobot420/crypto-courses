type TradeData = {
    data: {
        buy_order_id: number,
        amount_str: string,
        timestamp: string,
        microtimestamp: string,
        id: number,
        amount: number,
        sell_order_id: number,
        price_str: string,
        type: number,
        price: number
    },
    event: string,
    channel: string
}

export default TradeData