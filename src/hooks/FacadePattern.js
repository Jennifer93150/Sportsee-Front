import { MockedData } from "./useMockedData";
import { useSportSeeApi } from "./useSportSeeApi";

/**
 * recovery of api data or mocked data if the back is not available
 * @param {string} service 
 * @param {number} userId 
 * @returns {array.Object}
 */
export function FacadePattern(service, userId) {
    const {data, isLoading, error } = useSportSeeApi(service, userId);
   
    if (error || isLoading) {
        const api = new MockedData()
        return api.getDataMockedByService(service, userId);
    }
    
    return data;
}

