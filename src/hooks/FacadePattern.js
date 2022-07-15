import { MockedData } from "./useMockedData";
import { useSportSeeApi } from "./useSportSeeApi";

export function FacadePattern(service, userId) {
    const {data, isLoading, error } = useSportSeeApi(service, userId);
   
    if (error || isLoading) {
        const api = new MockedData()
        return api.getDataMockedByService(service, userId);
    }
    
    return data;
}

