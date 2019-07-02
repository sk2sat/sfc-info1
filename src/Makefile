TARGET	= main.wasm
SRCS	= test.c
OBJS	= $(SRCS:.c=.o)

CC	:= clang
CXX	:= clang++
LD	:= wasm-ld

CFLAGS	= --target=wasm32
CXXFLAGS= --target=wasm32
LDFLAGS	= --no-entry --export-all

%.o:%.c
	$(CC) -o $@ -c $(CFLAGS) $<

%.o:%.cc
	$(CXX) -o $@ -c $(CFLAGS) $<

# command
default:
	make $(TARGET)

clean:
	rm -f $(TARGET)
	rm -f *.o

$(TARGET): $(OBJS)
	$(LD) -o $@ $(LDFLAGS) $^
