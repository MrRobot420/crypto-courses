import config from 'config';

export const formatEtherResponse = (amount: string): string => {
    const ethConstant: number = config.get('ETHERSCAN.CONSTANT')
    return (parseInt(amount) / ethConstant).toString()
}