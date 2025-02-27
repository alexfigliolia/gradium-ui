import { Debouncer } from "@figliolia/react-hooks";
import { setManagementTaskStatus } from "GraphQL/Mutations/setManagementTaskStatus.gql";
import type {
  Expense,
  ManagementTask,
  SetManagementTaskStatusMutation,
  SetManagementTaskStatusMutationVariables,
} from "GraphQL/Types";
import type {
  ManagementTaskPriority,
  ManagementTaskStatus,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { EnhancedSet } from "Tools/EnhancedSet";
import { PropertyScopeModel } from "./PropertyScopeModel";

export abstract class TaskModel<
  T extends ITaskModel,
> extends PropertyScopeModel<T> {
  protected readonly taskDebouncer = new Debouncer(() => this.fetch(), 500);

  public abstract fetch(): Promise<void>;

  public abstract pushExpense(expense: Expense): void;

  public abstract updateByID(task: ManagementTask, scopedTask?: boolean): void;

  public abstract updateExpenseByID(expense: Expense, scoped?: boolean): void;

  public abstract deleteByID(id: number): void;

  public abstract getByID(id: number): ManagementTask | undefined;

  public getGQLArgs() {
    const { assignmentFilter, searchFilter, priorityFilter } = this.getState();
    return {
      assignedToId: assignmentFilter.size
        ? Array.from(assignmentFilter)
        : undefined,
      searchString: searchFilter ? searchFilter : undefined,
      priority: priorityFilter.size ? Array.from(priorityFilter) : undefined,
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
    };
  }

  public setTaskStatus(task: ManagementTask, status: ManagementTaskStatus) {
    this.updateByID({ ...task, status });
    const client = new UIClient({});
    void client.executeQuery<
      SetManagementTaskStatusMutation,
      SetManagementTaskStatusMutationVariables
    >(setManagementTaskStatus, {
      status,
      id: task.id,
      organizationId: Scope.getState().currentOrganizationId,
    });
  }

  public setLoading(loading: boolean) {
    this.set("loading", loading);
  }

  public readonly filterByPriority = this.debouncedFetchProxy(
    (priorities: EnhancedSet<ManagementTaskPriority>) => {
      this.set("priorityFilter", priorities);
    },
  );

  public readonly filterByAssignee = this.debouncedFetchProxy(
    (assignees: EnhancedSet<number>) => {
      this.set("assignmentFilter", assignees);
    },
  );

  public readonly search = this.debouncedFetchProxy((search?: string) => {
    this.set("searchFilter", search);
  });

  public readonly clearPriorityFilter = this.debouncedFetchProxy(() => {
    this.set("priorityFilter", new EnhancedSet());
  });

  public readonly clearAssignmentFilter = this.debouncedFetchProxy(() => {
    this.set("assignmentFilter", new EnhancedSet());
  });

  public readonly resetAllFilters = this.debouncedFetchProxy(() => {
    this.update(state => {
      state.assignmentFilter = new EnhancedSet();
      state.priorityFilter = new EnhancedSet();
      state.searchFilter = undefined;
    });
  });

  public set<K extends keyof T>(key: K, value: T[K]) {
    this.update(state => {
      state[key] = value;
    });
  }

  private debouncedFetchProxy<F extends (...args: any[]) => any>(func: F) {
    return (...args: Parameters<F>) => {
      func(...args);
      void this.taskDebouncer.execute();
    };
  }
}

export interface ITaskModel {
  filters: boolean;
  loading: boolean;
  searchFilter?: string;
  priorityFilter: EnhancedSet<ManagementTaskPriority>;
  assignmentFilter: EnhancedSet<number>;
}
