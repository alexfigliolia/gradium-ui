import type { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";
import { SearchBar } from "Components/SearchBar";
import { PageTitle } from "Layouts/Management";
import type { Callback } from "Types/Generics";
import { AvailabilitySkeleton } from "../AvailabilitySkeleton";
import { SpaceList } from "../SpaceList";

export const AvailabilitySection = <T,>({
  list,
  error,
  title,
  loading,
  renderItem,
}: Props<T>) => {
  if (!list.length && !loading && !error) {
    return null;
  }

  if (loading) {
    return <AvailabilitySkeleton title={title} />;
  }

  return (
    <Fragment>
      <PageTitle title={title} className="lease-title">
        <SearchBar placeholder="Search" />
      </PageTitle>
      <SpaceList>{list.map(space => renderItem(space))}</SpaceList>
    </Fragment>
  );
};

interface Props<T> {
  list: T[];
  title: string;
  loading: boolean;
  error: boolean;
  renderItem: Callback<[item: T], ReactNode>;
}
