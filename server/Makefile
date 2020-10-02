
define ECHO
    @printf "\033[;31m"; printf $1; printf "\033[0m\n"
endef

build=release
export GOPATH=$(PWD)
export GOBIN=$(PWD)/bin
export GO111MODULE=off

RELEASE_FLAGS = -v -ldflags "-w -s"
DEBUG_FLAGS = -v -gcflags "-N -l"

ifeq ($(build), release)
    BUILD_FLAGS = $(RELEASE_FLAGS)
else
    BUILD_FLAGS = $(DEBUG_FLAGS)
endif

go_target = YUT

.PHONY: $(go_target)

all: YUT


$(go_target): export target = $@


$(go_target):
	@$(call ECHO, "[build $(go_target) ...]")
	go install $(BUILD_FLAGS) $(target)

clean:
	-rm bin/YUT
