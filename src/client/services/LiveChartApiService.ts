/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LiveChartAnimeData } from '../models/LiveChartAnimeData';
import type { LiveChartAnimeInfo } from '../models/LiveChartAnimeInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LiveChartApiService {

    /**
     * Live Anime
     * @param animeId
     * @returns LiveChartAnimeInfo Successful Response
     * @throws ApiError
     */
    public static liveAnimeLivechartAnimeAnimeIdGet(
        animeId: string,
    ): CancelablePromise<LiveChartAnimeInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/livechart/anime/{anime_id}',
            path: {
                'anime_id': animeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Live Anime Schedule
     * @returns LiveChartAnimeData Successful Response
     * @throws ApiError
     */
    public static liveAnimeScheduleLivechartScheduleGet(): CancelablePromise<Record<string, Array<LiveChartAnimeData>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/livechart/schedule',
        });
    }

}
