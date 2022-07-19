import { MockedData } from "./useMockedData";
import { useSportSeeApi } from "./useSportSeeApi";

/**
 * recovery of api data or mocked data if the back is not available
 * @param {string} service 
 * @param {number} userId 
 * @returns {array.Object}
 */
export function FacadePattern(service, userId) {
    let getMockedData;
    const { isLoading } = useSportSeeApi(service, userId);
    
    /**
     * If api access unavailable use mocked data
     */
    if( isLoading ) {
        const mockedData = new MockedData();
        getMockedData = mockedData.getDataMockedByService(service, userId);
        return getMockedData;
    }
    

    
}

