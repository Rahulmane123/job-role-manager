import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchJobRoles = createAsyncThunk(
  "jobRoles/fetchJobRoles",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().jobRoles;
      const response = await axiosInstance.get("/jobroles", {
        params: {
          search: filters.search,
          department: filters.department,
          sort: filters.sort
        }
      });

      return response.data.jobRoles;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch job roles."
      );
    }
  }
);

export const createJobRole = createAsyncThunk(
  "jobRoles/createJobRole",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/jobroles", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Create failed." });
    }
  }
);

export const updateJobRole = createAsyncThunk(
  "jobRoles/updateJobRole",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/jobroles/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Update failed." });
    }
  }
);

export const deleteJobRole = createAsyncThunk(
  "jobRoles/deleteJobRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/jobroles/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete failed."
      );
    }
  }
);

const initialForm = {
  jobTitle: "",
  department: "",
  level: "Junior",
  description: ""
};

const jobRolesSlice = createSlice({
  name: "jobRoles",
  initialState: {
    items: [],
    filters: {
      search: "",
      department: "",
      sort: "desc"
    },
    pagination: {
      page: 0,
      rowsPerPage: 5
    },
    selectedRole: null,
    form: initialForm,
    isLoading: false,
    isSaving: false,
    error: null
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 0;
    },
    setPagination(state, action) {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setSelectedRole(state, action) {
      state.selectedRole = action.payload;
      state.form = action.payload
        ? {
            jobTitle: action.payload.jobTitle,
            department: action.payload.department,
            level: action.payload.level,
            description: action.payload.description
          }
        : initialForm;
    },
    resetForm(state) {
      state.selectedRole = null;
      state.form = initialForm;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        const maxPage = Math.max(
          0,
          Math.ceil(action.payload.length / state.pagination.rowsPerPage) - 1
        );
        state.pagination.page = Math.min(state.pagination.page, maxPage);
      })
      .addCase(fetchJobRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createJobRole.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(createJobRole.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(createJobRole.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload;
      })
      .addCase(updateJobRole.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateJobRole.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(updateJobRole.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload;
      })
      .addCase(deleteJobRole.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(deleteJobRole.fulfilled, (state, action) => {
        state.isSaving = false;
        state.items = state.items.filter((item) => item._id !== action.payload.id);
      })
      .addCase(deleteJobRole.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, setPagination, setSelectedRole, resetForm } =
  jobRolesSlice.actions;
export default jobRolesSlice.reducer;
