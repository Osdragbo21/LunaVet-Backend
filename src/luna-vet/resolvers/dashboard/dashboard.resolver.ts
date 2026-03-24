import { Resolver, Query } from '@nestjs/graphql';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { DashboardMetrics } from '../../dtos/dashboard/dashboard-metrics.object';

@Resolver()
export class DashboardResolver {
    constructor(private readonly dashboardService: DashboardService) {}

    @Query(() => DashboardMetrics, { name: 'getAdminDashboardMetrics' })
    getAdminDashboardMetrics() {
        return this.dashboardService.getMetrics();
    }
}