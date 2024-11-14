import React from 'react';
import Card from '../ui/card';

const ClassSchedule = () => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="border rounded-md p-4 hover:bg-accent transition-colors">
          <h3 className="font-medium">피아노 기초</h3>
          <p className="text-sm text-muted-foreground">강사: 김민수</p>
          <p className="text-sm text-muted-foreground">시간: 14:00 - 15:00</p>
        </div>
        {/* 더 많은 수업 일정들... */}
      </div>
    </Card>
  );
};

export default ClassSchedule;