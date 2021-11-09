import { Contracts } from 'constants/networks';
import { ALCHEMY_ABI } from 'contracts';
import useContract from 'hooks/useContract';

import { ZOOBOOSTER_ABI } from './abi';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const CHAIN = isMainnet ? 888 : 999;

export const useZooBoosterContract = () => {
    const { getContract } = useContract();

    const getZooBoosterContract = async () =>
        await getContract(Contracts[CHAIN].zooBooster, ZOOBOOSTER_ABI);

    const getBoosting = async (tokenId) => {

        const contract = await getZooBoosterContract();
        return await contract.getBoosting(
            tokenId
        );
    };

    const getLockTimeReduce = async (tokenId) => {

        const contract = await getZooBoosterContract();
        return await contract.getLockTimeReduce(
            tokenId
        );
    };

    return {
        getBoosting,
        getLockTimeReduce
    };
}

export const useZooElixirContract = () => {
    const { getContract } = useContract();

    const getAlchemyContract = async () =>
        await getContract(Contracts[CHAIN].zooAlchemy, ALCHEMY_ABI);

    const getElixir = async (tokenId) => {

        const contract = await getAlchemyContract();
        return await contract.elixirInfoMap(
            tokenId
        );
    };

    return {
        getElixir
    };
}