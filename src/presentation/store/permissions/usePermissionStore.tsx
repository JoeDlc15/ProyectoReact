import { create } from "zustand";
import { checkLocationPermission, requestLocationPermission } from "../../../actions/permissions/location";
import type { PermissionStatus } from "../../../infrastructure/interfaces/permissions";


interface PermissionsState{
    locationsStatus: PermissionStatus;

    requestLocationPermission: () => Promise<PermissionStatus>;
    checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionStore = create<PermissionsState>()( set => ({
    locationsStatus: 'undetermined',

    requestLocationPermission: async () => {
        const status = await requestLocationPermission();
        set({ locationsStatus: status });
        return status
    },
    checkLocationPermission: async () => {
        const status = await checkLocationPermission();
        set({ locationsStatus: status });
        return status
    },

}));