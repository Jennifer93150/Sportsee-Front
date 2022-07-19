import { MockedData } from "./useMockedData";
import { useSportSeeApi } from "./useSportSeeApi";
import { useMockedData } from "../datas/data";
import { Error } from "../pages/Error";

/**
 * recovery of api data or mocked data if the back is not available
 * @param {string} service 
 * @param {number} userId 
 * @returns {array.Object|Object}
 */
export function FacadePattern(service, userId) {
    
    const { data, isLoading } = useSportSeeApi(service, userId);
    
    /**
     * Use mocked data if api access unavailable 
     */
    if( useMockedData || isLoading ) {
        const mockedData = new MockedData();
        return mockedData.getDataMockedByService(service, userId);
    }

    return data
}

