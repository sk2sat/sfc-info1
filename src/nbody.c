#include "wasm.h"

// imported func
//void draw_circle(int x, int y, int r);

#define MAX_PARTICLE 100

double Pos[MAX_PARTICLE*2];
double Vel[MAX_PARTICLE*2];
double Acc[MAX_PARTICLE*2];

int num_particle = 0;
double dt = 0.01;

double sqrt(double x){
	double s,last;

	if(x<=0.0)
		return 0.0;

	if (x > 1)
		s = x;
	else
		s = 1;
	do {
		last = s;
		s = (x / s + s) * 0.5;
	} while (s < last);

	return last;
}

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
	Pos[i*2]	= x;
	Pos[i*2+1]	= y;
	Vel[i*2]	= 0.0;
	Vel[i*2+1]	= 0.0;
	Acc[i*2  ]	= 0.0;
	Acc[i*2+1]	= 0.0;
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
		for(int k=0;k<num_particle;k++){
			if(i==k) continue;
			double dx = Pos[k*2  ] - Pos[i*2  ];
			double dy = Pos[k*2+1] - Pos[i*2+1];
			double r2 = dx*dx + dy*dy;
			double r  = sqrt(r2);
			if(r == 0) continue;
			double rtmp = r2*r;

			Acc[i*2  ] += dx / rtmp;
			Acc[i*2+1] += dy / rtmp;
		}
	}

	for(int i=0;i<num_particle;i++){
		Vel[i*2  ] += Acc[i*2  ] * dt;
		Vel[i*2+1] += Acc[i*2+1] * dt;
		Pos[i*2  ] += Vel[i*2  ] * dt;
		Pos[i*2+1] += Vel[i*2+1] * dt;
	}
}
