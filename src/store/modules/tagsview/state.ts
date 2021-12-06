/*
 * @Description: tags-view state
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-06 14:43:49
 */
import { RouteLocationNormalized } from "vue-router";
import { MatchPattern } from "vue";
export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export interface TagsViewState {
  visitedViews: TagView[];
  cachedViews: (MatchPattern | undefined)[];
}

export const state: TagsViewState = {
  visitedViews: [],
  cachedViews: [],
};
