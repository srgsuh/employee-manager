import {ButtonGroup, IconButton, Pagination} from "@chakra-ui/react";
import {pageSize} from "../config/employees-config.json";
import {usePageState} from "../state-management/store.ts";
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";

const Paginator = () => {
    const page = usePageState(s=>s.page);
    const setPage = usePageState(s=>s.setPage);
    const count = usePageState(s=>s.itemCount);
    return (
        <Pagination.Root
            count={count}
            pageSize={pageSize}
            page={page}
            onPageChange={(e) => setPage(e.page)}
        >
            <ButtonGroup variant="ghost" size="sm">
                <Pagination.PrevTrigger asChild>
                    <IconButton>
                        <HiChevronLeft />
                    </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                    render={(page) => (
                        <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                            {page.value}
                        </IconButton>
                    )}
                />

                <Pagination.NextTrigger asChild>
                    <IconButton>
                        <HiChevronRight />
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    );
};

export default Paginator;