/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GogoAnimeGogoCdn } from '../models/GogoAnimeGogoCdn';
import type { GogoAnimeInfo } from '../models/GogoAnimeInfo';
import type { GogoAnimeSearch } from '../models/GogoAnimeSearch';
import type { StreamingServers } from '../models/StreamingServers';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GogoAnimeApiService {

    /**
     * Search
     * @param query
     * @param page
     * @returns GogoAnimeSearch Successful Response
     * @throws ApiError
     */
    public static searchGogoanimeSearchGet(
        query: string,
        page: number = 1,
    ): CancelablePromise<GogoAnimeSearch> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gogoanime/search',
            query: {
                'query': query,
                'page': page,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Getanimeinfo
     * @param animeId
     * @returns GogoAnimeInfo Successful Response
     * @throws ApiError
     */
    public static getAnimeInfoGogoanimeAnimeAnimeIdGet(
        animeId: string,
    ): CancelablePromise<GogoAnimeInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gogoanime/anime/{anime_id}',
            path: {
                'anime_id': animeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Getanimeepisode
     * @param episodeId
     * @param server
     * @returns GogoAnimeGogoCdn Successful Response
     * @throws ApiError
     */
    public static getAnimeEpisodeGogoanimeWatchEpisodeIdGet(
        episodeId: string,
        server?: StreamingServers,
    ): CancelablePromise<GogoAnimeGogoCdn> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gogoanime/watch/{episode_id}',
            path: {
                'episode_id': episodeId,
            },
            query: {
                'server': server,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
