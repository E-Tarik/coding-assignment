import { axiosHelper } from 'helpers';
import { loadAllMovies } from '../redux/slices/movies-slice';
import { AppDispatch } from 'redux/store';

const apiKey = process.env.REACT_APP_API_KEY;

export const getAllMovies = (page: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axiosHelper(
      `discover/movie/?api_key=${apiKey}&sort_by=vote_count.desc&page=${page}`
    );
    dispatch(loadAllMovies(response));
    return response;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const searchMovies =
  (query: string, page?: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosHelper(
        `search/movie?api_key=${apiKey}&query=${query}&page=${page ?? 1}`
      );
      dispatch(loadAllMovies(response));
      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  };
