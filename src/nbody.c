#include "wasm.h"

// imported func
//void draw_circle(int x, int y, int r);

#define MAX_PARTICLE 100

double Pos[MAX_PARTICLE*2];
double Vel[MAX_PARTICLE*2];

int num_particle = 0;

EXPORT int get_num(){
	return num_particle;
}

EXPORT int get_x(int n){
	return (int)Pos[n*2];
}

EXPORT int get_y(int n){
	return (int)Pos[n*2+1];
}

void set_particle(int i, double x, double y){
	Pos[i*2] = x;
	Pos[i*2+1]= y;
}

EXPORT void add_particle(int x, int y){
	if(num_particle >= MAX_PARTICLE){ // error
		return;
	}
	set_particle(num_particle, x, y);
	num_particle++;
}

EXPORT void update(){
	for(int i=0;i<num_particle;i++){
		Pos[i*2] += 0.1;
		Pos[i*2+1]+=0.1;
	}
}
